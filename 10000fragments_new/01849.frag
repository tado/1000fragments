uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.10;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.22)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.66 - t * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.33; p = rot2(1.49) * p; }
	p += vec2(0.55, -0.90) * sin(length(p) * 4.54 - time * 0.86) * 0.16;
	p = rot2(time * -0.78) * p;
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 4.20 - time * 0.58); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.97 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
