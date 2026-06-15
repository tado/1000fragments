uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.50 + t * 0.85 + ph) + sin(p.y * 4.20 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.85, -0.42) * sin(length(p) * 3.58 - time * 1.65) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.10, vec3(0.55, 0.42, 0.55), vec3(0.39, 0.39, 0.31), vec3(0.82, 0.83, 1.19), vec3(0.83, 0.60, 0.01));
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
