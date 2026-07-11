uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.22 - t * 4.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.30, vec3(0.51, 0.53, 0.54), vec3(0.45, 0.48, 0.36), vec3(0.90, 1.18, 1.30), vec3(0.67, 0.68, 0.19));
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
