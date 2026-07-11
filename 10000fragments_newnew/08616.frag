uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.28 + sin(p.y * 5.50 + t * 5.02) * 2.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	p = (floor(p * 24.6) + 0.5) / 24.6;
	p = rot2(p.y * 1.97 + time * 0.78) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.93));
	p.y += sin(p.x * 5.89 + time * 2.68) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.34));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
