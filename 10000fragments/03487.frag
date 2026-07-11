uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.01) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 3.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 4.43 - time * 0.40); }
	p *= 2.57;
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.18, 0.22), vec3(0.60, 0.64, 0.47), d);
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
