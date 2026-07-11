uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.39, t * 0.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 33.79 - t * 2.63 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 38.98 - t * 2.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.51;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.88 + time * 0.01, vec3(0.41, 0.58, 0.41), vec3(0.41, 0.49, 0.39), vec3(0.92, 1.18, 1.39), vec3(0.14, 0.41, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
