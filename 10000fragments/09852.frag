uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.40 + t * 3.91 + ph) + sin(p.y * 11.50 - t * 2.63 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	p = fract(p * 1.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.15, vec3(0.41, 0.46, 0.56), vec3(0.36, 0.48, 0.50), vec3(1.12, 1.20, 0.92), vec3(0.90, 0.46, 0.17));
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
