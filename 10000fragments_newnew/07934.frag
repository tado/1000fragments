uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.37; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 9.29 - t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.60, length(p) * 5.95 - time * 0.69); }
	p = (floor(p * 6.7) + 0.5) / 6.7;
	p += vec2(0.32, -0.45) * sin(length(p) * 5.44 - time * 1.11) * 0.32;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.99; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.72 + time * 0.21);
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
