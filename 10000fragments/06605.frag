uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.98;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.13)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.67 - t * 4.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	p = rot2(time * -0.61) * p;
	p *= 1.67;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.31; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.05, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
