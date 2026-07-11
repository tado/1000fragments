uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.66 + sin(p.y * 3.68 + t * 4.39) * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.54; p = rot2(0.81) * p; }
	{ float fr = length(p); p *= 1.0 + 0.37 * fr * fr; }
	p.y += sin(p.x * 4.52 + time * 2.02) * 0.36;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.01, 0.06), vec3(0.51, 0.50, 0.69), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
