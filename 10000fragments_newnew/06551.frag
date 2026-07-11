uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.55 - t * 0.86;
    v = sin(floor(lv * 2.9) / 2.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.86 + time * 1.04) * p;
	p = rot2(0.33) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(2.52) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.49, 1.51, 0.80) + vec3(0.00, 0.02, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
