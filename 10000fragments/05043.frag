uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.83 + t * 1.34 + ph) + sin(p.y * 13.76 - t * 1.34 + ph)
        + sin((p.x + p.y) * 6.73 + t * 1.34 + ph) + sin(length(p) * 13.60 - t * 1.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	p = fract(p * 2.32) - 0.5;
	p *= 1.58;
	{ float fr = length(p); p *= 1.0 + 0.40 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.27, vec3(0.58, 0.58, 0.53), vec3(0.44, 0.36, 0.42), vec3(0.92, 1.12, 1.12), vec3(0.31, 0.53, 0.90));
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
