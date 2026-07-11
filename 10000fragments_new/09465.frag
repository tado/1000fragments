uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.69 + t * 5.51 + ph) + sin(p.y * 10.81 - t * 4.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.90, 0.84) * sin(length(p) * 5.74 - time * 1.84) * 0.21;
	p = rot2(1.11) * p;
	p = (floor(p * 13.3) + 0.5) / 13.3;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
