uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.36 + sin(p.y * 3.12 + t * 3.66) * 1.01 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.76, 0.47) * sin(length(p) * 5.91 - time * 1.38) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.15, vec3(0.60, 0.50, 0.58), vec3(0.47, 0.31, 0.36), vec3(1.35, 1.33, 0.94), vec3(0.95, 0.86, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
