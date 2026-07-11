uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.08 + t * 2.81 + ph) + sin(p.y * 14.55 - t * 3.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.91) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.26, vec3(0.50, 0.45, 0.53), vec3(0.35, 0.46, 0.32), vec3(1.06, 0.97, 0.78), vec3(0.86, 0.66, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
