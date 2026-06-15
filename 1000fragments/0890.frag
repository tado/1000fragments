uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.26 - t * 1.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.14 - t * 7.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.44) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.87);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.29, vec3(0.49, 0.52, 0.42), vec3(0.47, 0.33, 0.46), vec3(0.77, 0.99, 1.36), vec3(0.97, 0.19, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
