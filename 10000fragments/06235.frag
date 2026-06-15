uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.52 - t * 8.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p *= 1.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.18, vec3(0.58, 0.44, 0.52), vec3(0.33, 0.45, 0.34), vec3(1.11, 1.23, 1.09), vec3(0.59, 0.60, 0.43));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
