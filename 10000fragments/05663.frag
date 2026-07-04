uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.30;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.50)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.70 - t * 5.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.96;
	p = rot2(time * 0.62) * p;
	p += vec2(-0.82, 0.33) * sin(length(p) * 3.01 - time * 0.90) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.78, 0.81, 0.82) * (0.08 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
