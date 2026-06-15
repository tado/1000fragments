uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.65 + t * 4.73 + ph) + sin(p.y * 6.82 - t * 3.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.07, vec3(0.57, 0.48, 0.50), vec3(0.40, 0.48, 0.33), vec3(1.19, 0.80, 1.10), vec3(0.52, 0.22, 0.72));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
