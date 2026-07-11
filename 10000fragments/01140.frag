uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.50 + t * 3.89 + ph) + sin(p.y * 5.58 - t * 3.89 + ph)
        + sin((p.x + p.y) * 5.31 + t * 3.89 + ph) + sin(length(p) * 5.62 - t * 3.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(1.24) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.04, 0.24), vec3(0.82, 0.63, 0.53), d);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
