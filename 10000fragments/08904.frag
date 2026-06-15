uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 15.57 - t * 7.01 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 20.83 - t * 7.01 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.13, t * 1.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p += vec2(-0.93, -0.69) * sin(length(p) * 3.53 - time * 1.43) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + time * 0.09, vec3(0.48, 0.43, 0.46), vec3(0.47, 0.31, 0.43), vec3(0.91, 1.38, 1.13), vec3(0.55, 0.34, 0.41));
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
