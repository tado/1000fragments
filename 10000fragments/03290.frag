uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.74) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 3.07 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.37; p = rot2(1.04) * p; }
	p *= 2.07;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.56));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
