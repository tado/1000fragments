uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.98 + vec2(t * 2.81, -t * 2.81) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.45 - t * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = rot2(time * 0.81) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.41 + time * 0.05, vec3(0.58, 0.51, 0.44), vec3(0.36, 0.33, 0.33), vec3(1.23, 1.26, 0.87), vec3(0.53, 0.90, 0.15));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
