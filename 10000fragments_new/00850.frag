uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.92 - t * 4.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p = rot2(time * -1.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.14, vec3(0.57, 0.43, 0.45), vec3(0.45, 0.49, 0.34), vec3(0.78, 1.35, 0.89), vec3(0.79, 0.48, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
