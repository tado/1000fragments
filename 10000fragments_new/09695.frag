uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.73 + t * 3.37 + ph) + sin(p.y * 2.02 - t * 4.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 7.96 + time * 2.86) * 0.26;
	p = fract(p * 1.02) - 0.5;
	p *= 2.82;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.03, vec3(0.42, 0.57, 0.49), vec3(0.38, 0.40, 0.46), vec3(1.12, 1.14, 1.18), vec3(0.53, 0.90, 0.49));
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
