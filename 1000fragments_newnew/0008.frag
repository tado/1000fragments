uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.73;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.62)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.19 - t * 4.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = rot2(length(p) * -3.74 + (time * 0.83) * 0.78) * p;
	p = rot2(p.y * 1.98 + (time * 0.83) * 0.33) * p;
	float d = field(p, (time * 0.83), 0.0);
	vec3 col = vec3(0.75, 0.69, 0.66) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 2.03 + (time * 0.83) * 12.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.998, 0.931) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
