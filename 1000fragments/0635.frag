uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.49 + sin(p.y * 1.85 + t * 3.18) * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	p = fract(p * 2.81) - 0.5;
	p = rot2(2.32) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 0.99));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
