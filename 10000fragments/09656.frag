uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.87 + t * 3.86 + ph) + sin(p.y * 7.18 - t * 3.86 + ph)
        + sin((p.x + p.y) * 4.72 + t * 3.86 + ph) + sin(length(p) * 3.18 - t * 3.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.25, vec3(0.49, 0.54, 0.50), vec3(0.50, 0.35, 0.49), vec3(1.33, 0.86, 0.91), vec3(0.34, 0.95, 0.10));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
