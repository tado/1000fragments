uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.71 - t * 6.53 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.64 + t * 2.34 + ph) + sin(p.y * 7.89 - t * 2.34 + ph)
        + sin((p.x + p.y) * 9.56 + t * 2.34 + ph) + sin(length(p) * 13.70 - t * 2.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.06);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.82 + time * 0.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
