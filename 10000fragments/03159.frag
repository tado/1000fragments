uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.39;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 20.81 - t * 5.00 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.49 * sin(mf + 3.0) + ph), cos(t * 1.12 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	vec2 q1 = p; vec2 q2 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.80;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.46 + time * 0.37, vec3(0.58, 0.55, 0.40), vec3(0.46, 0.33, 0.47), vec3(1.12, 0.89, 1.12), vec3(0.68, 0.46, 0.57));
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
