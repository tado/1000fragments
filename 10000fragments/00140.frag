uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.73 + t * 0.54 + ph) + sin(p.y * 16.34 - t * 1.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.95, length(p) * 4.80 - time * 0.56); }
	p *= 3.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.46, 0.11), vec3(0.99, 0.82, 0.51), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
