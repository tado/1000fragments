uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.00 + t * 0.84) - 0.5) * 2.0;
    v = sin((p.y * 7.02 + zx * 0.61 + t * 1.45) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p += vec2(0.29, 0.42) * sin(length(p) * 5.53 - time * 1.86) * 0.19;
	p = rot2(1.55) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.86));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 1.99));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
