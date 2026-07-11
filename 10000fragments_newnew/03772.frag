uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.86;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 3.11 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.62);
    float gsh = hash21(vec2(grow, floor(t * 5.66))) - 0.5;
    float gx = p.x + gsh * 1.14;
    v = sin(gx * 15.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.75));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.39;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.78));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.29);
	float d = d1 * d2;
	vec3 col = vec3(0.37, 0.37, 0.67) * (0.13 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
