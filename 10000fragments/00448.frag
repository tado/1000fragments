uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.72 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.09, vec3(0.41, 0.52, 0.47), vec3(0.40, 0.32, 0.35), vec3(1.14, 1.20, 1.36), vec3(0.75, 0.09, 0.63));
	col = mod(col * 1.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
