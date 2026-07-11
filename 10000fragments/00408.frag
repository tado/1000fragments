uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.48 + t * 2.76 + ph) + sin(p.y * 13.41 - t * 3.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.17, vec3(0.44, 0.41, 0.44), vec3(0.33, 0.41, 0.36), vec3(0.74, 1.36, 1.13), vec3(0.99, 0.20, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
