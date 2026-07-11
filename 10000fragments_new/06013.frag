uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.33);
    float gsh = hash21(vec2(grow, floor(t * 8.15))) - 0.5;
    float gx = p.x + gsh * 1.08;
    v = sin(gx * 17.45 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.02));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.20 * cos(sa * 6.0 + t * 2.73 + ph);
    v = sin((sr - petal) * 7.78);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.17, 0.73, 1.08) + vec3(0.23, 0.11, 0.15);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.83 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
