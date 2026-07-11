uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.31;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.34)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 22.69 - t * 6.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	p = rot2(time * -1.26) * p;
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 3.09 - time * 0.50); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.59) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.80));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
