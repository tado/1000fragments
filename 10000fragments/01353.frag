uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.63 + vec2(t * 0.84, -t * 0.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.27 + t * 3.89 + ph) + sin(p.y * 7.20 - t * 3.89 + ph)
        + sin((p.x + p.y) * 9.95 + t * 3.89 + ph) + sin(length(p) * 14.51 - t * 3.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.76;
	p = fract(p * 1.38) - 0.5;
	p = abs(p) - 0.70;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.50 + time * 0.12, vec3(0.59, 0.54, 0.43), vec3(0.36, 0.36, 0.31), vec3(0.87, 0.80, 1.26), vec3(0.47, 0.86, 0.23));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
