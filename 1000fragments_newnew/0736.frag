uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.46 * sin(t * 1.32) + t * 2.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.07 * sin(mf + 3.0) + ph), cos(t * 1.51 * cos(mf + 3.0) + ph));
        ms += 0.095 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.92 + (time * 0.73) * 0.40) * q1;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.73) * 2.50));
	q2 = rot2(length(q2) * 2.80 + (time * 0.73) * 1.23) * q2;
	q2 *= 2.42;
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 0.04);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.73) * 0.93));
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.64, 0.65, 0.51) + vec3(0.04, 0.05, 0.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.986, 1.058) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
