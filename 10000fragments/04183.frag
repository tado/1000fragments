uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.32 + t * 1.12 + ph) + sin(p.y * 10.12 - t * 1.12 + ph)
        + sin((p.x + p.y) * 7.03 + t * 1.12 + ph) + sin(length(p) * 12.55 - t * 1.12 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p += vec2(0.36, -0.59) * sin(length(p) * 3.70 - time * 0.81) * 0.22;
	p = rot2(time * -0.57) * p;
	p *= 1.78;
	p = rot2(p.y * 3.08 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.26, vec3(0.55, 0.41, 0.58), vec3(0.32, 0.41, 0.38), vec3(1.12, 1.20, 1.30), vec3(0.73, 0.59, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
