uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.65 + t * 1.14 + ph) + sin(p.y * 13.54 - t * 4.57 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 12.00 - t * 6.38 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 20.63 - t * 5.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d = d1 * d2;
	vec3 col = hue(d * 0.42 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
