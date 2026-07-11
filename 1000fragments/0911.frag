uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.72 + t * 3.46 + ph) + sin(p.y * 16.29 - t * 0.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	p = fract(p * 2.03) - 0.5;
	p = rot2(2.75) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.63));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
