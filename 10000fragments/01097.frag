uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.78 + t * 3.97 + ph) + sin(p.y * 8.10 - t * 3.97 + ph)
        + sin((p.x + p.y) * 3.75 + t * 3.97 + ph) + sin(length(p) * 6.96 - t * 3.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.27; p = rot2(2.19) * p; }
	p += vec2(0.32, 0.02) * sin(length(p) * 5.44 - time * 0.90) * 0.17;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.29, 0.11), vec3(0.81, 0.89, 0.44), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
