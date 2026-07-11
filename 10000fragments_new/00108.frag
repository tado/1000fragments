uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.36 + t * 1.37 + ph) + sin(p.y * 4.96 - t * 3.30 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	p.x += sin(p.y * 7.88 + time * 3.48) * 0.15;
	p += vec2(-0.53, 0.27) * sin(length(p) * 4.85 - time * 2.04) * 0.34;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.17, vec3(0.46, 0.42, 0.49), vec3(0.31, 0.42, 0.31), vec3(0.74, 1.24, 0.94), vec3(0.50, 0.16, 0.04));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
