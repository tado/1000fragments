uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.34;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.74)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.72 - t * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.45 + time * 1.20) * p;
	p.x += sin(p.y * 7.87 + time * 3.90) * 0.32;
	p = rot2(0.40) * p;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.89));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
