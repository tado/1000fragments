uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.13);
    float gsh = hash21(vec2(grow, floor(t * 2.15))) - 0.5;
    float gx = p.x + gsh * 0.78;
    v = sin(gx * 13.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.10));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 36.00 - t * 5.34 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 37.94 - t * 1.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.78, 0.91, 0.35) * (0.10 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
