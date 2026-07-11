uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.09 + t * 0.80 + ph) + sin(p.y * 10.81 - t * 0.80 + ph)
        + sin((p.x + p.y) * 6.59 + t * 0.80 + ph) + sin(length(p) * 16.49 - t * 0.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p += vec2(0.55, -0.47) * sin(length(p) * 4.89 - time * 1.55) * 0.23;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.17; p = rot2(0.69) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.20, 0.27), vec3(0.87, 0.59, 0.45), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
