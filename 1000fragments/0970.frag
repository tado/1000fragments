uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.24 + sin(p.y * 4.86 + t * 3.15) * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.07, vec3(0.56, 0.60, 0.54), vec3(0.45, 0.32, 0.36), vec3(0.89, 1.10, 1.36), vec3(0.26, 0.54, 0.33));
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
