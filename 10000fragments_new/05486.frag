uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.38; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.80 - t * 0.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	p.x += sin(p.y * 4.85 + time * 3.96) * 0.32;
	p += vec2(-0.63, 0.69) * sin(length(p) * 5.19 - time * 1.41) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.21, vec3(0.53, 0.51, 0.57), vec3(0.49, 0.50, 0.36), vec3(1.00, 1.05, 1.08), vec3(0.40, 0.66, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
