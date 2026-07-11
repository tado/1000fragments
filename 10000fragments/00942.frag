uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.03 + t * 4.90 + ph) + sin(p.y * 12.13 - t * 4.90 + ph)
        + sin((p.x + p.y) * 6.23 + t * 4.90 + ph) + sin(length(p) * 14.56 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p = fract(p * 1.06) - 0.5;
	p = rot2(length(p) * 2.02 + time * 1.17) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.24, 0.38), vec3(0.86, 0.66, 0.46), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
