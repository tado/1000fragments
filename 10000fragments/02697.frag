uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 35.72 - t * 1.51 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 15.90 - t * 1.51 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.71 + t * 4.40 + ph) + sin(p.y * 5.32 - t * 1.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = d1 + d2;
	vec3 col = palette(d * 1.27 + time * 0.29, vec3(0.42, 0.58, 0.41), vec3(0.32, 0.37, 0.41), vec3(0.79, 1.23, 1.05), vec3(0.32, 0.96, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
