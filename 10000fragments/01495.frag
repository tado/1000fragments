uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.40 - t * 6.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.14, vec3(0.42, 0.57, 0.40), vec3(0.37, 0.37, 0.50), vec3(1.11, 0.77, 0.96), vec3(0.67, 0.50, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
