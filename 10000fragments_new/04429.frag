uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.84 + t * 1.79 + ph) + sin(p.y * 3.88 - t * 1.83 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	p = (floor(p * 18.2) + 0.5) / 18.2;
	p += vec2(-0.59, 0.85) * sin(length(p) * 2.14 - time * 1.43) * 0.32;
	p = rot2(length(p) * 3.85 + time * 0.71) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.86));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
