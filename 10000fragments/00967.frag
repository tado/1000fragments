uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.81 + t * 0.74 + ph) + sin(p.y * 2.90 - t * 0.74 + ph)
        + sin((p.x + p.y) * 3.31 + t * 0.74 + ph) + sin(length(p) * 8.64 - t * 0.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	p += vec2(-0.77, 0.45) * sin(length(p) * 5.87 - time * 0.93) * 0.23;
	p = rot2(length(p) * 1.65 + time * 0.50) * p;
	p = fract(p * 1.54) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
