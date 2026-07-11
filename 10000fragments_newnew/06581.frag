uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.04;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.68) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.13) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.15, vec3(0.60, 0.59, 0.50), vec3(0.42, 0.41, 0.40), vec3(0.88, 0.94, 0.89), vec3(0.74, 0.38, 0.11));
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
